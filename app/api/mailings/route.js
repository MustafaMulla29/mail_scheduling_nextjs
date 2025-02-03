import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'tmp', 'mailings.json');
let mailings = JSON.parse(fs.readFileSync(filePath, 'utf8')).mailings;

export const GET = (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
        const mailing = mailings.find(m => m.id === parseInt(id));
        if (mailing) {
            return new Response(JSON.stringify(mailing), { status: 200 });
        } else {
            return new Response('Mailing not found', { status: 404 });
        }
    }

    return new Response(JSON.stringify(mailings), { status: 200 });
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

export const PATCH = async (req) => {
    try {
        const { data, id } = await req.json();

        const index = mailings.findIndex(mailing => mailing.id === id);
        mailings[index] = {
            id,
            ...data
        };

        fs.writeFileSync(filePath, JSON.stringify({ mailings }, null, 2), 'utf8');

        return new Response(JSON.stringify({
            mailing: data,
            message: "Mailing updated successfully!"
        }), { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return new Response('Internal server error', { status: 500 });
    }
};

export const DELETE = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const id = parseInt(searchParams.get('id'), 10);

        if (!id) return new Response('Invalid request', { status: 400 });

        mailings = mailings.filter(mailing => mailing.id !== id)

        fs.writeFileSync(filePath, JSON.stringify({ mailings }, null, 2), 'utf8');

        return new Response(JSON.stringify({
            message: "Mailing deleted successfully!"
        }), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response('Internal server error', { status: 500 });
    }
}