import "./App.css";
import "./Component/search-box/searchList.styles.css";
import { useEffect, useState } from "react";
import Users from "./Component/monsters-list/Users.component";
import Search from "./Component/search-box/SearchList.component";

const App = () => {
	const [users, setUsers] = useState([]);
	const [title, setTitle] = useState('Kitties Rolodex');

	const [usersBufor, setUsersBufor] = useState(users);
	const [searchField, setSearchField] = useState("");

	// Monsters downloading start
	useEffect(() => {
		console.log("Users");
		fetch("http://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((Users) => {
				// console.log(Users);
				return setUsers(Users);
			});
	}, []);

	// console.log("render", users);

	useEffect(() => {
		console.log("Filter");
		const temp = users.filter((user) => {
			// console.log(searchField, user);
			return user.name.toLowerCase().includes(searchField.toLowerCase());
		});
		setUsersBufor(temp);
	}, [searchField, users]);

	// ChangeHandler users function start

	const onSearchChangeHandler = (event) => {
		setSearchField(event.target.value);
	};

	const onTitleChangeHandler = (event) => {
		setTitle(event.target.value);
	};
	// ChangeHandler users function end

	// console.log(usersBufor);
	return (
		<div className='App'>
			<header>
				<h1 className='app-title'>{title}</h1>
			</header>
			<Search
				onChangeHandler={onSearchChangeHandler}
				className='search-box'
				placeholder='Find your monster'></Search>
			<br />
			<Search
				onChangeHandler={onTitleChangeHandler}
				className='Title search-box'
				placeholder='Your Title!'></Search>

			<Users users={usersBufor}></Users>
		</div>
	);
};
export default App;
