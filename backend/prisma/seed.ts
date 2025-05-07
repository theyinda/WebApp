import { PrismaClient } from '../generated/prisma/client'

import fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';

const prisma = new PrismaClient();

async function main() {
    const results: any[] = [];

    const filePath = path.join(__dirname, 'MockData.csv');

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            for (const row of results) {
                // Find user by customer name
                let user = await prisma.user.findFirst({
                    where: { name: row.customerName },
                });

                // If user does not exist, create a new one (optional)
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            name: row.customerName,
                            email: `${row.customerName.replace(' ', '').toLowerCase()}@kemi.com`,
                            password: 'defaultPassword', // hash if necessary
                            role: 'CUSTOMER',
                        },
                    });
                }
                const [day, month, year] = row.order_date.split('/');
                const formattedDate = new Date(`${year}-${month}-${day}`);
                // Create order
                await prisma.order.create({
                    data: {
                        productName: row.product_name,
                        productCategory: row.product_category,
                        price: parseFloat(row.price),
                        orderDate: formattedDate,
                        customerId: user.id,
                    },
                });

                console.log(`Imported order for ${row.customerName}`);
            }

            await prisma.$disconnect();
        });
}

main().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
