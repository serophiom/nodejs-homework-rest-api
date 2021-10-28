const Mailgen = require('mailgen');

class EmailService {
    constructor(env, sender) {
        this.sender = sender
        switch (env) {
            case 'development':
                this.link = 'http://localhost:300';           
                break;
            case 'production':
                this.link = 'link for production';           
                break;
            default:
                break;
        }
    }
    createTemplateEmail(name, verifyToken) {
        const mailGenerator = new Mailgen({
            theme: 'neopolitan',
            product: {
                name: 'Contacts api',
                link: this.link,
            },
        });

        const email = {
            body: {
                name,
                intro: 'Contacts api! We\'re very excited to have you on board.',
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
        
    };
};