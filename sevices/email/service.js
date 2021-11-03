const Mailgen = require('mailgen');

class EmailService {
    constructor(env, sender) {
        this.sender = sender
        switch (env) {
            case 'development':
                this.link = 'https://4b97-92-52-137-48.ngrok.io';
                break;
            case 'production':
                this.link = 'link for production';           
                break;
            default:
                this.link = 'http://localhost:3000';
                break;
        }
    }
    createTemplateEmail(name, verifyToken) {
        const mailGenerator = new Mailgen({
            theme: 'neopolitan',
            product: {
                name: 'Contacts service',
                link: this.link,
            },
        });

        const email = {
            body: {
                name,
                intro: 'Contacts service! We are very excited to have you on board.',
                action: {
                    instructions: 'To get started with Contacts api, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify${verifyToken}`,
                    },
                },
            },
        };
        return mailGenerator.generate(email);
    };

    async sendVerifyEmail(email, name, verifyToken) {
      const emailHTML = this.createTemplateEmail(name, verifyToken);
      const message = {
        to: email,
        subject: 'Verify your email',
        html: emailHTML
      }
      try {
        const result = await this.sender.send(message);
        return true;
      } catch (error) {
        console.log(error.message);
        return false;
      } 
      
    };
};

module.exports = EmailService;