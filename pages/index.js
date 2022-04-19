import Link from 'next/link';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import Section from '../components/Section';
import { bootstrap as bootstrapGlobalAgent } from 'global-agent';

export const getStaticProps = async () => {

	bootstrapGlobalAgent();

	//const url = "https://api-us-east-1.graphcms.com/v2/cl1y3b9gr10hp01xtfscu00sr/master";
	//const graphcmsToken = `Bearer ${process.env.NEXT_PUBLIC_GRAPH_CMS_TOKEN}`

	const client = new ApolloClient({
		uri: process.env.NEXT_PUBLIC_ENPOINT,
		cache: new InMemoryCache(),
		headers: {
			"authorization": `Bearer ${process.env.NEXT_PUBLIC_GRAPH_CMS_TOKEN}`
		}
	});

	const query = gql`
		query AllVideos {
			videos {
				createdAt
				id
				title
				description
				seen
				slug
				tags
				thumbnail {
					url
				}
				mp4 {
					url
				}
			}
		}
	`;

	const data = await client.query({
		query: query
	});

	const videos = data.data.videos;

	return {
		props: {
			videos
		}
	}
}

const Home = ({ videos }) => {

	const randomVideo = (videos) => {
		return videos[Math.floor(Math.random() * videos.length)];
	}

	const filterVideos = (videos, genre) => {
		return videos.filter((video) => video.tags.includes(genre));
	}

	return (
		<>
			<div className='app'>
				<div className="main-video">
					<img 
						src={randomVideo(videos).thumbnail.url} 
						alt={randomVideo(videos).title} 
						className='main-video_img'
					/>
				</div>

				<div className="video-feed">
					<Section genre={`Family`} videos={filterVideos(videos, 'family')}/>
					<Section genre={`Thriller`} videos={videos}/>
					<Section genre={`Classic`} videos={videos}/>
					<Section genre={`Pixar`} videos={videos}/>
					<Section genre={`Marvel`} videos={videos}/>
					<Section genre={`National Geographic`} videos={videos}/>
					<Section genre={`Disney`} videos={videos}/>
					<Section genre={`Star Wars`} videos={videos}/>
				</div>
			</div>
		</>
	)
}

export default Home;
