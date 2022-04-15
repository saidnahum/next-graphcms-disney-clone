import Link from 'next/link';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import Section from '../components/Section';
//import { bootstrap as bootstrapGlobalAgent } from 'global-agent';

export const getStaticProps = async () => {

	//bootstrapGlobalAgent();

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
	
	return (
		<>
			<div className='app'>
				<div className="main-video">
					<img src={randomVideo(videos).thumbnail.url} alt={randomVideo(videos).title} width={300}/>
				</div>
			</div>

			<div className="video-feed">
				<Section genre={`Family`}/>
				<Section genre={`Thriller`}/>
				<Section genre={`Classic`}/>
				<Section genre={`Pixar`}/>
				<Section genre={`Marvel`}/>
				<Section genre={`National Geographic`}/>
				<Section genre={`Disney`}/>
				<Section genre={`Star Wars`}/>
			</div>
		</>
	)
}

export default Home;
