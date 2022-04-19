import { gql, ApolloClient, InMemoryCache, useMutation } from '@apollo/client';
import { bootstrap as bootstrapGlobalAgent } from 'global-agent';


export const addPostQuery = gql`
   mutation createPost ($title: String!, $description: String!) {
      createPost(
      data: {title: $title, description: $description}
      ) {
         title
         description
      }
   }
`;

export const getPostsQuery = gql`
		query getPosts {
			posts {
            title
            description
         }
		}
	`;

export const getStaticProps = async () => {

   bootstrapGlobalAgent();

   const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_ENPOINT,
      cache: new InMemoryCache(),
      headers: {
         "authorization": `Bearer ${process.env.NEXT_PUBLIC_GRAPH_CMS_TOKEN}`
      }
   });

   

   const data = await client.query({
      query: getPostsQuery
   });

   const posts = data.data.posts

   return {
      props: {
         posts
      }
   }
}

const posts = ({ posts }) => {

   const [createPost, {data}] = useMutation(addPostQuery);

   const handleSubmit = (e) => {
      e.preventDefault()
      //console.log(e.target.elements);

      const { title, description } = e.target.elements;

      if(!title.value || !description.value){
         return
      }

      createPost({
         variables: { title: title.value, description: description.value },
         refetchQueries: [{query: getPostsQuery}]
      })
   }

   console.log(posts);


   return (
      <>
         {
            posts.map((post, i) => (
               <div key={i}>
                  <h1>{post.title}</h1>
                  <p>{post.description}</p>
               </div>
            ))
         }

         <form onSubmit={handleSubmit}>
            <div>
               <input type="text" name="title" placeholder='title' />
            </div>

            <div>
               <textarea name="description" placeholder='description'></textarea>
            </div>

            <button>Create Post</button>
         </form>
      </>
   )
}

export default posts;