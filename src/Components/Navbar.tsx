
import { Link } from 'react-router-dom'


interface Props{
  page : String
}


const navLinkStyle = 'text-white border-b-2 font-bold h-full flex justify-center items-center hover:border-b-green-500 px-4 '
function Navbar(props : Props) {
  const currentPage = props.page
  return (
    <div className='bg-[#141414] h-full flex justify-evenly items-center '>
      <Link className="h-full" to="/"><div className={navLinkStyle+(currentPage=='todos' ? 'border-b-green-500' : 'border-b-[#5B5B5B]')}><span className='duration-[500ms] hover:-translate-y-2 ease-in-out'>Todos</span></div></Link>
      <Link className="h-full" to="/finances"><div className={navLinkStyle+(currentPage=='finances' ? 'border-b-green-500' : 'border-b-[#5B5B5B]')}><span className='duration-[500ms] hover:-translate-y-2 ease-in-out'>Finances</span></div></Link>
      <Link className="h-full" to="/friends"><div className={navLinkStyle+(currentPage=='friends' ? 'border-b-green-500' : 'border-b-[#5B5B5B]')}><span className='duration-[500ms] hover:-translate-y-2 ease-in-out'>Friends</span></div></Link>
      <Link className="h-full" to="/diary"><div className={navLinkStyle+(currentPage=='diary' ? 'border-b-green-500' : 'border-b-[#5B5B5B]')}><span className='duration-[500ms] hover:-translate-y-2 ease-in-out'>Diary</span></div></Link>
    </div>
  )
}

Navbar.propTypes = {}

export default Navbar
