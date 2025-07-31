import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // POST /payments
  @Post()
  async create(@Body() body: any) {
    return this.paymentsService.create(body);
  }

  // GET /payments
  @Get()
  async findAll() {
    return this.paymentsService.findAll();
  }

  // GET /payments/stats
  @Get('stats')
  async getStats() {
    return this.paymentsService.getStats();
  }

  // GET /payments/revenue-chart (optional, fallback)
  @Get('revenue-chart')
  getRevenueChart() {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      values: [1000, 1200, 900, 1500, 1800],
    };
  }

  // ✅ NEW: GET /payments/chart — used by your dashboard
  // @Get('chart')
  // getWeeklyChartData() {
  //   return {
  //     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //     data: [200, 400, 300, 500, 600, 700, 800],
  //   };
  // }

    @Get('chart')
  async getWeeklyChartData() {
    return this.paymentsService.getChartData();
  }

}
