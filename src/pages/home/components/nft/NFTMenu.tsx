import { Dashboard } from "./Dashboard"
import { Home } from "./Home"
import { Portfolio } from "./Portfolio"
import { Sell } from "./Sell"

export const NFTMenu = (props) => {
  const renderComponent = () => {
    switch (props.NFTNav) {
      case "home":
        return <Home />
      case "sell":
        return <Sell />
      case "portfolio":
        return <Portfolio />
      case "dashboard":
        return <Dashboard />
      default:
        return <Home />
    }
  }

  return <div>{renderComponent()}</div>
}
