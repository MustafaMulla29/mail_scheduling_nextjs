import mailers from './../../../tmp/mailers.json'

export const GET = (req) => {

    if (mailers.length === 0) {
        return new Response(JSON.stringify({ message: 'No mailers found' }), { status: 404 })
    }
    return new Response(JSON.stringify(mailers), { status: 200 })
}

