import { useParams } from "react-router-dom";
import { Component, useContext } from "react";
import Carousel from "./Carousel";
import ErrorBoundares from "./ErrorBoundaries";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";
class Details extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { loading: true };
  // }

  state = { loading: true, showModal: false }; // to samo co na górze tylko używając class properties.

  async componentDidMount() {
    //to jest praktycznie to samo co useEffect tyle że z klasami
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();

    this.setState(Object.assign({ loading: false }, json.pets[0])); //to samo co na dole (poniżej spread) tylko raz wywwołujemy setState co jest bardzo korzystne. Tutaj używamy object assign
    // this.setState(Object.assign({ loading: false, ...json.pets[0] })); //to samo co na górze ale przy użyciu object spread operator

    // this.setState({
    //   loading:false
    // })
    // this.setState(json.pet[0])
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  render() {
    if (this.state.loading) {
      return <h2>loading....</h2>;
    }

    // throw new Error("Lma o you Crashed");

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>

          <button
            onClick={this.toggleModal}
            style={{ backgroundColor: this.props.theme }}
          >
            Adopt {name}
          </button>

          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <a href="https://bit.ly/pet-adopt">Yes</a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}
const WrappedDetails = () => {
  const params = useParams();
  const [theme] = useContext(ThemeContext);
  // console.log(params.path)
  return (
    <ErrorBoundares>
      <Details theme={theme} params={params} />;
    </ErrorBoundares>
  );
};
// const Details = () => {
//     const {id} = useParams();
//   return <h2>{id}</h2>;
// };

export default WrappedDetails;
