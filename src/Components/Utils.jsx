// let ORIGIN = `https://life-gui.blazingknightog.repl.co`
export let ORIGIN = `http://localhost:3000`
export async function POST(endpoint,data,callback=()=>{}){
    return fetch(ORIGIN+endpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => callback(response))
}

export async function GET(endpoint,callback=()=>{}){
    return fetch(ORIGIN+endpoint)
    .then(response => response.json())
    .then(response => callback(response))
}