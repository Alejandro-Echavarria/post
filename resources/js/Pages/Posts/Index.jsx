import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/inertia-react';
import Post from '@/Components/Post';

const Index = ({ auth, posts }) => {

	const { data, setData, post, processing, reset, errors } = useForm({
		title: '',
		body: ''
	});

	const submit = (e) => {
		e.preventDefault();

		post(route('posts.store'), { onSuccess: () => reset() });
	}

	return (
		<AuthenticatedLayout auth={ auth }>
			<Head title={'Posts'} />
			<div className='py-6'>
				<div className='max-w-7xl mx-auto px-4'>
					<div className='p-2'>
						<h1 className="text-3xl text-gray-700 font-bold pb-6">Posts</h1>
						<div className='border p-5 rounded-2xl'>
							<form onSubmit={ submit }>
								<input  
									value={ data.title }
									onChange={ e => setData('title', e.target.value) }
									type='text'
									placeholder='Title'
									autoFocus
									className='mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-lg shadow-sm'
								/>
								<InputError message={ errors.title } className='mt-2'/>
								<textarea
									value={ data.body }
									onChange={ e => setData('body', e.target.value) }
									type='text'
									placeholder='Body'
									className='mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-lg shadow-sm'
								>
								</textarea>
								<InputError message={ errors.body } className='mt-2'/>
								<div className='flex justify-end w-auto '>
									<PrimaryButton
										className='mt-4 text-gray-800 bg-gray-300/20 focus:outline-none font-bold rounded-xl text-sm px-5 py-2.5 text-center hover:bg-gray-300/50 focus:ring-transparent focus:bg-gray-300/20 transition ease-in-out'
										disabled = { processing }
									>
										Create
									</PrimaryButton>
								</div>
							</form>
						</div>
						<h2 className="text-3xl text-gray-700 font-bold py-6">List of posts</h2>
						<div className=' bg-gray-50/20 rounded-2xl border divide-y'>
							{
								posts.map( post => 
									<Post key={ post.id } post={post} />	
								)
							}
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}

export default Index;