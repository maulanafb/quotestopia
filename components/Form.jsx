import Link from 'next/link'
import React from 'react'

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className='head_text text-left'><span className='blue_gradient'>{type} Quotes</span></h1>
      <p className="text-left max-w-md desc">{type} and Bagikan kutipan inspiratif secara ajaib kepada dunia✨✨✨.</p>
      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        <label><span className='font-satoshi font-semibold'>Quotes Kamu</span>
          <textarea value={post.prompt} onChange={(e) => setPost({ ...post, prompt: e.target.value })} placeholder='Tulis quotes kamu disini' required className='form_textarea' />
        </label>
        <label><span className='font-satoshi font-semibold'>Hashtag <span className='font-normal'>(#malam, #pagi, #galau, #motipasi , or any etc)</span></span>
          <input value={post.tag} onChange={(e) => setPost({ ...post, tag: e.target.value })} placeholder='Hashtag kamu' required className='form_input' />
        </label>
        <div className="flex-end mx-3 mb-3 gap-4">
          <Link href='/' className='text-gray-500 text-sm'>Cancel</Link>
          <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
