import dayjs from 'dayjs';
import { Price, PrismaClient, } from '@prisma/client';

import { CreateEvent } from '../src/@types/event-types';
import { CreatePrice } from '../src/@types/pricing-types';

class Seed {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private generatePricing() {
    const pricing: CreatePrice = {
      inPerson: 250000,
      online: 100000,
      withHotel: 350000,
      withoutHotel: 0
    };

    return pricing;
  }

  private generateEvent({ id }: Price): CreateEvent {
    const event: CreateEvent = {
      title: 'Driven.t',
      logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
      backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
      startsAt: dayjs().toDate(),
      endsAt: dayjs().add(21, 'days').toDate(),
      priceId: id
    }

    return event;
  }

  public async main() {
    try {
      console.log("Truncating tables...\n");
      await this.prisma.$queryRaw`TRUNCATE TABLE events RESTART IDENTITY CASCADE;`;
      await this.prisma.$queryRaw`TRUNCATE TABLE prices RESTART IDENTITY CASCADE;`;
  
  
      console.log("Creating prices...\n")
      const price = await this.prisma.price.create({
        data: this.generatePricing(),
      });
  
  
      console.log("Creating event...\n");
      await this.prisma.event.create({
        data: this.generateEvent(price),
      });

      console.log("OK")
    } catch (error) {
      console.error(error);
      process.exit(1);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

new Seed().main();