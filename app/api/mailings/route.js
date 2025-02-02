import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'mailings.json');
let mailings = JSON.parse(fs.readFileSync(filePath, 'utf8')).mailings;

export const GET = () => {
    return Response.json(mailings);
};

export const POST = async (req) => {
    try {
        const newMailing = await req.json();
        const id = mailings.length + 1;
        const mailingData = {
            id,
            ...newMailing
        }

        mailings.push(mailingData);

        fs.writeFileSync(filePath, JSON.stringify({ mailings }, null, 2), 'utf8');

        return new Response(JSON.stringify({
            mailing: newMailing,
            message: "Mailing added successfully!"
        }), { status: 201 });

    } catch (error) {
        console.error('Error:', error);
        return new Response('Internal server error', { status: 500 });
    }
};