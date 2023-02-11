const cron = require('node-cron')
const TicketNotificationModel = require("../models/ticketNotification.model")
const EmailTransporter = require("../notifier/emailService")


cron.schedule('*/1 * * * *', async () => {   //RUNS EVERY 1 minute
    
    const notifications = await TicketNotificationModel.find({
        sentStatus: "UN_SENT"
    })

    console.log(`Count of unsent notification: ${notifications.length}`)

    notifications.forEach(notification => {
        const mailData = {
            from: '"Nilanjan Haldar" nil.haldar@gmail.com',
            replyTo: '"Nilanjan Haldar" nil.haldar@gmail.com',
            to: notification.receipientEmails,
            subject: notification.subject,
            text: notification.content
        }
        console.log(mailData)

        EmailTransporter.sendMail(mailData, async (err, info) => {
            if (err) {
                console.log(err.message)
            } else {
                console.log("Email Sent Successsfully");
                console.log(info)
                console.log("Email Sent Successsfully");
                const savedNotification = await TicketNotificationModel
                    .findOne({ _id: notification._id })
                savedNotification.sentStatus = "SENT"
                await savedNotification.save()
            }
        })
    })
})