const Search = ({ onChangeHandler, className, placeholder }) => {
	// console.log("Propsyy", this.props);
	return (
		<input
			className={`search-box ${className}`}
			type='search'
			placeholder={placeholder}
			onChange={onChangeHandler}
		/>
	);
};
export default Search;
