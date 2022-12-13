import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export async function getStaticProps() {
	const client = new ApolloClient({
		uri: process.env.APOLLO_HOST + ":" + process.env.APOLLO_PORT,
		cache: new InMemoryCache()
	});

	const { data } = await client.query({
		query: gql`
		query {
			getAll {
				name,
				listing_url,
				summary,
				space,
				notes
			}
		}
		`
	});

	return {
		props: {
			response: data
		}
	}
}

export default function Home({ response }: any) {
	return (

		<div className='container '>
			<h1 className='h1 text-center my-5'>Expenses</h1>
			<button className='btn btn-primary btn-sm'><i className="bi bi-plus-square-dotted px-1"></i> Create New Expense</button>
			<hr />
			<table className='table table-striped '>
				<thead>
					<tr><th>#ID</th>
						<th>Expense name</th>
						<th>Category</th>
						<th>Amount</th>
						<th>User</th>
						<th>Action</th></tr>
				</thead>
				{/* <tbody>
					{
						response.map((e) => (
							<tr>
								<td>{e.id}</td>
								<td>{e.expensename}</td>
								<td>{e.category}</td>
								<td>{e.amount}</td>
								<td>{e.user}</td>
								<td>
									<a href="#">
										<i className="bi bi-pencil text-black px-1"></i>
										<i className="bi bi-trash text-black px-1"></i>
									</a>
								</td>
							</tr>
						))
					}
				</tbody> */}
				{/* <tbody>
					{
						response.map((e) => (
							<tr>
								<td>{e.id}</td>
								<td>{e.expensename}</td>
								<td>{e.category}</td>
								<td>{e.amount}</td>
								<td>{e.user}</td>
								<td>
									<a href="#">
										<i className="bi bi-pencil text-black px-1"></i>
										<i className="bi bi-trash text-black px-1"></i>
									</a>
								</td>
							</tr>
						))
					}
				</tbody> */}
			</table>
		</div >

	)
}