

// export const ORIGIN = 'https://life-gui.onrender.com'
export const ORIGIN = 'http://localhost:8080'


export const BorderButton = ({backgroundColor,borderColor,onClick,textContent} : any)=>(
    <button 
    onClick={onClick} 
    style={{backgroundColor,
        borderColor,color:borderColor}}
    className={`px-5 py-2 border-[1px] duration-200 ease-in-out rounded-xl`}>
        {textContent}
    </button>
)