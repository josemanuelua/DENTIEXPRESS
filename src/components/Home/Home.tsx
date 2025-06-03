import { FormattedMessage } from "react-intl";

const Home:React.FC = ()=>{

    return(
        <div className="homediv">
            <p><FormattedMessage id="app.home.label.welcome"/> </p>
            <FormattedMessage id="app.home.label.title"/>
        </div>
    );

}

export default Home;