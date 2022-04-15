import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

export const getServerSideProps = async (ctx) => {

   const client = new ApolloClient({
		uri: process.env.NEXT_PUBLIC_ENPOINT,
		cache: new InMemoryCache(),
		headers: {
			"authorization": `Bearer ${process.env.NEXT_PUBLIC_GRAPH_CMS_TOKEN}`
		}
	});

   const query = gql`
      query SingleVideo ($slug: String) {
         video (where: {slug: $slug}) {
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

   const pageSlug = ctx.query.slug;   

   const data = await client.query({
		query: query,
      variables: { slug: pageSlug }
	});

   //console.log(data.data.video);
	
   const video = data.data.video;
   return {
      props: {
         video
      }
   }
}

const VideoPage = ({ video }) => {
   console.log(video);
   return (
      <div>
         <h1>{video.title}</h1>
         <p>{video.description}</p>
      </div>
   )
}

export default VideoPage;