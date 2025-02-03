import lists from './../../../tmp/lists.json'

export const GET = (req) => {
    if (lists.length === 0) {
        return new Response(JSON.stringify({ message: 'No lists found' }), { status: 404 })
    }
    return new Response(JSON.stringify(lists), { status: 200 })
}


