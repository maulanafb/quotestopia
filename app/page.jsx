import Feed from '@components/Feed'
import React from 'react'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>Telusuri dan Bagikan <br className='max-md:hidden' /><span className='orange_gradient text-center'>Kutipan Menggairahkan</span></h1>
      <p className='desc text-center'>"Quotestopia adalah platform Kutipan-kutipan , tempat Anda dapat menemukan, membuat, dan berbagi kutipan-kutipan kreatif dan menggairahkan."</p>
      {/* feed  */}
      <Feed />

    </section>
  )
}

export default Home
