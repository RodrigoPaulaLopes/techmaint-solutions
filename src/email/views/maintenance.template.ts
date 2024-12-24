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
