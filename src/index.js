import "./styles/style.css";
import Sidebar from "./components/sidebar";
import Main from "./components/main";
import Footer from "./components/footer";
import DataManager from "./components/dataManager";



const sidebar = new Sidebar();
const dataManager = new DataManager();

const main = new Main(sidebar, dataManager);
const footer = new Footer();
