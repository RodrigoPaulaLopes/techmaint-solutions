import { Maintenance } from "../../maintenance/entities/maintenance.entity"
import { formatDate } from "../../utils/utils"


export const maintenanceTemplate = (maintenance: Maintenance) => {
    const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Maintenance Scheduled</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background: #ffffff;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            h2 {
                color: #007bff;
                border-bottom: 2px solid #007bff;
                padding-bottom: 10px;
                margin-bottom: 20px;
            }
            ul {
                list-style: none;
                padding: 0;
            }
            ul li {
                margin-bottom: 10px;
            }
            ul li strong {
                color: #555;
            }
            p {
                margin: 10px 0;
            }
            .footer {
                margin-top: 20px;
                font-size: 0.9em;
                color: #666;
            }
            .footer strong {
                color: #007bff;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Maintenance Scheduled - ${maintenance.machine.name}</h2>
            <p>Hello <strong>${maintenance.technicians.map(user => user.name).join(", ")}</strong>,</p>
            <p>We would like to inform you that a new maintenance has been scheduled for the equipment <strong>${maintenance.machine.name}</strong>.</p>

            <h3>Maintenance Details:</h3>
            <ul>
                <li><strong>Maintenance Date:</strong> ${formatDate(maintenance.date_maintenance.toISOString())}</li>
                <li><strong>Description:</strong> ${maintenance.description}</li>
                <li><strong>Maintenance Type:</strong> ${maintenance.type}</li>
                <li><strong>Status:</strong> ${maintenance.status}</li>
            </ul>

            <p>Please make sure to be available on the scheduled date and time to carry out the necessary tasks.</p>

            <p>If there are any issues or if you need further information, please don't hesitate to contact us.</p>

            <div class="footer">
                <p>Best regards,<br>
                <strong>Techmaintenance Solutions LTDA</strong><br>
                2660-0000</p>
            </div>
        </div>
    </body>
    </html>
    `;
    return template;
};


export const canceledMaintenanceTemplate = (maintenance: Maintenance) => {
    const template = `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Maintenance Cancelled</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f8f9fa;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #d9534f;
                        color: #ffffff;
                        padding: 10px 20px;
                        border-radius: 8px;
                        text-align: center;
                    }
                    .content {
                        padding: 20px;
                        font-size: 16px;
                    }
                    .footer {
                        text-align: center;
                        font-size: 14px;
                        color: #777;
                        margin-top: 30px;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #d9534f;
                        color: white;
                        text-decoration: none;
                        border-radius: 4px;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Maintenance Cancelled</h2>
                    </div>
                    <div class="content">
                        <p>Dear ${maintenance.technicians.map(user => user.name).join(", ")},</p>

                        <p>We regret to inform you that the scheduled maintenance for the machine <strong>${maintenance.machine.name}</strong> has been cancelled.</p>

                        <p>We apologize for any inconvenience caused and will notify you if a new maintenance schedule is set.</p>

                        <p>If you have any questions or concerns, please feel free to contact us.</p>

                        <p>Thank you for your understanding.</p>

                        <p>Sincerely, <br> Techmaint Solutions LTDA</p>
                    </div>
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} Techmaint Solutions LTDA. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>

                `
    return template
}
