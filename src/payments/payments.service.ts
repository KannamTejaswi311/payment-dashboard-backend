import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './payment.schema';
import { Model } from 'mongoose';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async create(data: any) {
    const payment = new this.paymentModel(data);
    return payment.save();
  }

  async findAll() {
    return this.paymentModel.find().sort({ createdAt: -1 });
  }

  async getStats() {
    const payments = await this.paymentModel.find();

    const today = new Date().toISOString().slice(0, 10);

    const todaysPayments = payments.filter(
      p => p.createdAt?.toISOString().startsWith(today),
    ).length;

    const totalPayments = payments.length;

    const totalAmount = payments
      .filter(p => p.status === 'success')
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    return {
      totalPayments,
      todaysPayments,
      totalAmount,
    };
  }

  // ✅ NEW METHOD: Get dynamic chart data for past 7 days
  async getChartData() {
    const today = new Date();
    const pastWeek = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - i));
      return date.toISOString().slice(0, 10);
    });

    const allPayments = await this.paymentModel.find({
      createdAt: {
        $gte: new Date(pastWeek[0] + 'T00:00:00.000Z'),
        $lte: new Date(today.toISOString().slice(0, 10) + 'T23:59:59.999Z'),
      },
    });

    const dailyTotals = pastWeek.map(date => {
      const total = allPayments
        .filter(p => p.createdAt?.toISOString().startsWith(date))
        .reduce((sum, p) => sum + (p.amount || 0), 0);
      return total;
    });

    return {
      labels: pastWeek, // ISO date strings like '2025-07-25'
      data: dailyTotals,
    };
  }
}
