import LoginBanner from '../../assets/login.png'
import GoogleIcon from '../../assets/google.png'
import GithubIcon from '../../assets/github.png'

import { signInWithPopup } from 'firebase/auth';
import { auth, githubProvider, googleProvider } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function Login(){
  const redirect = useNavigate();
  async function signInWithGoogle(){
    try {
      await signInWithPopup(auth, googleProvider)
      await redirect("/home");
    } catch{
      toast.error('Erro ao realizar Login')
    }
  }
  
  async function signInWithGithub(){
    try {
      await signInWithPopup(auth, githubProvider);
      await redirect("/home");
    } catch{
      toast.error('Erro ao realizar Login')
    }
  }
  
  return(
    <div className="w-full h-screen flex p-4">
      <img src={LoginBanner} className='hidden sm:block w-[40%] rounded-md object-cover h-full' />
      <div className='w-[85%] md:w-[65%] lg:w-[35%]lg:w-[20%] flex flex-col m-auto'>
        <strong className='font-semibold text-white text-2xl'>Boas Vindas!</strong>
        <span className='font-normal text-gray-50 text-xs'>Faça seu login</span>
        <div className='mt-8 flex flex-col gap-4'>
          <button type='button'onClick={signInWithGoogle} className='py-4 px-8 flex items-center gap-4 bg-gray-600 rounded-md'>
            <img src={GoogleIcon} />
            <span className='font-medium text-white text-sm'>Entrar com o Google</span>
          </button>
          <button type='button' onClick={signInWithGithub} className='py-4 px-8 flex items-center gap-4 bg-gray-600 rounded-md'>
            <img src={GithubIcon} />
            <span className='font-medium text-white text-sm'>Entrar com o Github</span>
          </button>
        </div>
      </div>
    </div>
  )
}