import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { bootstrap as bootstrapGlobalAgent } from 'global-agent';

export const getStaticProps = async () => {

	bootstrapGlobalAgent();

	//const url = "https://api-us-east-1.graphcms.com/v2/cl1y3b9gr10hp01xtfscu00sr/master";
	//const graphcmsToken = `Bearer ${process.env.NEXT_PUBLIC_GRAPH_CMS_TOKEN}`

	const client = new ApolloClient({
		uri: process.env.NEXT_PUBLIC_ENPOINT,
		cache: new InMemoryCache(),
		headers: {
			"authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDk4ODg1MjAsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2NsMXkzYjlncjEwaHAwMXh0ZnNjdTAwc3IvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYWFlMDc3ODUtNmI2NS00ODMwLWJjZWItMWM5ZTZiZGM4MDAyIiwianRpIjoiY2wxeTUweTQwMHl2bTAxeHVkdnNkOTF5ZiJ9.ICEnSaPyFoKSc8PoizGozedhS8ngLk0x_FqRUF21DrkttlLQLv401P2Y5ptEcYWuBNttd_dRMqKXoUg_qSVwYQVb355pPwrepEDtb0PfXFNzm-6w5kvkhouMDZXGIOadcP-HlxfH2wtJImQcIpJHGqeFDTP4SVGymC015Ln8aSLAH_aNr4y_wgY_H25mC3LzJHK6ZgNqHF_QUTvrOuKi_NvoFgdvGhp8IhFOSeDPikcrqsk-ox_IL0MWsNhC6YDURJi-70EK878ElDR2SceHZhUq_gdPaFkCb6sVHqteexLD3vxXcW9VCeOtxY5xRqHlYcAA4CLj4AVC8eYCxcrLyUWV3EopKUzccz3KLDDCYbgoaBdCJ2VFDMCVfU73Fvb5XLZOOZ_BBXwRuQ0X8EXvTue48oO-xjxTbqmLJe_x-NCc7bTd5V2VrbZF_Pl_hgxinzg3awqFalBn6s7JBGJiYQ3CJT9uHSIcM2yZx8ZFXBUCQJyXJXT4fu90nWv_fsiiNc5BcJFa7y2cO_0DKEBRhuzsavs8TPQ2jFUL5fhv9eNXt-dy_CtU7gAM1KxtMzW5FTJ4bImaIPhwbLJZDu1nHUrwt6-3nsocwcPLdwkOoIymWvldV4iB2MwzKNPGJndrutduIsufYqgJkWK_2YqNYjjR-eFvuKc2RIogNwoUQAc"
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

	console.log(data);

	return {
		props: {
			data
		}
	}
}

const Home = ({ data }) => {
	console.log(data);
	return (
		<div>
			Hello
		</div>
	)
}

export default Home;
