import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/inertia-react';

dayjs.extend(relativeTime);

const Post = ({ post }) => {
	
	const {auth} = usePage().props;
	const [editing, setEditing] = useState(false);
	const {data, setData, patch, processing, reset, errors} = useForm({
		title: post.title,
		body: post.body
	});

	const submit = (e) => {
		e.preventDefault();

		patch(route('posts.update', post.id), { onSuccess: () => setEditing(false) });
	}

	return (
		<div className='p-5'>
			<div className='flex-1'>
				<div>
					<div className='flex'>
						<div className='mr-2'>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-dots" viewBox="0 0 16 16">
							<path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
							<path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
							</svg>
						</div>
						<div className='w-full'>
							<span className='font-bold text-gray-700'>{ post.user.name }</span>
							<small className='ml-2 text-xs text-gray-700'>{ new Date(post.created_at).toLocaleString() }</small>
							{ post.created_at !== post.updated_at && <small className='ml-2 text-xs font-semibold text-gray-700'>&middot; edited</small> }
						</div>
							{ post.user.id === auth.user.id &&
								<Dropdown>
									<Dropdown.Trigger>
										<button>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
												<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
											</svg>
										</button>
									</Dropdown.Trigger>
									<Dropdown.Content>
										<button
											className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-200 focus:bg-gray-100 transition duration-150 ease-in-out'
											onClick={ () => setEditing(true) }
										>
											Edit
										</button>
										<Dropdown.Link
											as='button'
											href={ route('posts.destroy', post.id) }
											method='delete'
										>
											Delete
										</Dropdown.Link>
									</Dropdown.Content>
								</Dropdown>
							}
					</div>
					<small className='text-xs font-semibold text-gray-600'>{ dayjs(post.created_at).fromNow() }</small>
					{ editing ?
						<form onSubmit={ submit }>
							<input 
								value={ data.title }
								onChange={ e => setData('title', e.target.value) }
								type='text'
								className='mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-lg shadow-sm'
								autoFocus
							/>
							<InputError message={ errors.title } className='mt-2'/>
							<textarea 
								value={ data.body }
								onChange={ e => setData('body', e.target.value) }
								className='mb-4 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-lg shadow-sm'
							>

							</textarea>
							<InputError message={ errors.body } className='mt-2'/>
							<div className='space-x-2'>
								<PrimaryButton className='mt-4'>
									Save
								</PrimaryButton>
								<button className='mt-4' onClick={ () => setEditing(false) && reset() }>Cancel</button>
							</div>
						</form>
						: (
							<>
								<p className='mt-4 text-sm text-gray-700'>{ post.title }</p>
								<p className='mt-4 text-sm text-gray-700'>{ post.body }</p>
							</>
						)
					}
				</div>
			</div>
		</div>
	)
}

export default Post;