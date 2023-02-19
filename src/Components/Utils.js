let ORIGIN = `https://life-gui.blazingknightog.repl.co`

export function POST(endpoint,data,callback=()=>{}){
    fetch(ORIGIN+endpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => callback(JSON.stringify(response)))
}

export function GET(endpoint,callback=()=>{}){
    fetch(ORIGIN+endpoint)
    .then(response => response.json())
    .then(response => callback(response))
}