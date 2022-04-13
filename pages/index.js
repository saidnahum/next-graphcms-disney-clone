import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
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
	
	return (
		<div>
			{videos.map((video, i) => (
				<div key={video.id}>
					<h1>{i+1}-{video.title}</h1>
					<p>{video.description}</p>
				</div>
			))}
		</div>
	)
}

export default Home;
