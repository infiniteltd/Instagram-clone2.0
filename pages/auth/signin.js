import { getProviders, signIn as signInWithProvider } from 'next-auth/react';
import Header from '../../components/Header';

function signIn({ providers }) {
    return (
        <>
            <div className='mb-24'>
                <Header />
            </div>

            <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center'>
                <img className='w-80' src="https://links.papareact.com/ocw" alt="" />

                <p className='font-xs italic'>This is not the REAL app. It is built for eductional purposes only.</p>

                <div className='mt-40'>
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button className='p-3 bg-blue-500 rounded-lg text-white' onClick={() => signInWithProvider(provider.id, { callbackUrl: '/' })}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {

    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}

export default signIn;
