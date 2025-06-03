import { FormattedMessage } from "react-intl";

const Dashboard: React.FC = () => {
    return (
        <div>
            <h2><FormattedMessage id="app.dashboard.bienvenido"/></h2>
            <hr />
            <p><FormattedMessage id="app.dashboard.descripcion"/></p>
        </div>


    );
};

export default Dashboard;