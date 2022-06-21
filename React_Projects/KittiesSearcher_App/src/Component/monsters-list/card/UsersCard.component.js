const UserCard = ({ user }) => {
	// console.log(user);
	const { id, name, email } = user;
	return (
		<div className='card' key={id}>
			<img
				src={`https://robohash.org/${id}?set=set4&size=180x180`}
				alt={`Some ${name} the Rawry Monster`}
			/>
			<h3>{name}</h3>
			<span>{email}</span>
		</div>
	);
};

export default UserCard;
