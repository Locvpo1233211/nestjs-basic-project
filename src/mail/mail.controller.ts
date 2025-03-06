import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Public, ResponseMessage } from 'src/auth/decorator/customize';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private mailerService: MailerService,
  ) {}

  @Cron(CronExpression.EVERY_SECOND)
  testCron() {
    console.log('test cron');
  }

  @Get()
  @Public()
  @ResponseMessage('Mail sent!')
  async sendMail() {
    await this.mailerService.sendMail({
      to: 'trongnghia1112223333@gmail.com',
      from: 'nest-modules',
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome',
      template: 'test',
      context: {
        candidateName: 'Nguyễn Văn A',
        companyName: 'Công Ty ABC',
        jobTitle: 'Lập Trình Viên Full-Stack',
        location: 'Hà Nội',
        salary: '20-25 triệu VNĐ/tháng',
        deadline: '15/03/2025',
        jobDescription:
          'Phát triển ứng dụng web, làm việc với frontend và backend...',
        contactEmail: 'hr@abc.com',
        applicationLink: 'https://abc.com/apply',
        year: new Date().getFullYear(),
        companyAddress: '123 Đường Láng, Hà Nội',
      },
    });

    return 'Mail sent!';
  }
}
