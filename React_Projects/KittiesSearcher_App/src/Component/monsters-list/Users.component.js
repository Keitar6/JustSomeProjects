import UserCard from "./card/UsersCard.component";
import "./users-card.styles.css";

const Users = ({users}) => {
	// console.log(users);
	return (
		<div className='card-list'>
			{users.map((Monster) => {
				return <UserCard user={Monster} />;
			})}
		</div>
	);
};

export default Users;
