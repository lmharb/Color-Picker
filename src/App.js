import React, { Component } from "react"
import Palette from "./Palette"
import PaletteList from "./PaletteList"
import SingleColorPalette from "./SingleColorPalette"
import NewPaletteform from "./NewPaletteForm"
import seedColors from "./seedColors"
import { Route, Switch } from "react-router-dom"
import { generatePalette } from "./colorHelpers"

class App extends Component {
  constructor(props) {
    super(props)
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
    this.state = {
      palettes: savedPalettes || seedColors,
      lastPaletteAdded: "",
      openSnack: false,
    }
    this.savePalette = this.savePalette.bind(this)
    this.deletePalette = this.deletePalette.bind(this)
    this.findPalette = this.findPalette.bind(this)
  }
  findPalette(id) {
    return this.state.palettes.find((palette) => {
      return palette.id === id
    })
  }

  savePalette(newPalette) {
    this.setState(
      {
        palettes: [...this.state.palettes, newPalette],
        lastPaletteAdded: newPalette.paletteName,
        openSnack: true,
      },
      () => {
        setTimeout(() => this.setState({ openSnack: false }), 3000)
        this.syncLocalStorage()
      }
    )
  }

  deletePalette(id) {
    this.setState(
      (st) => ({
        palettes: [...st.palettes].filter((palette) => palette.id !== id),
      }),
      this.syncLocalStorage
    )
  }

  syncLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
  }

  render() {
    const { palettes, lastPaletteAdded, openSnack } = this.state
    return (
      <div className='App'>
        <Switch>
          <Route
            exact
            path='/palette/new'
            render={(routeProps) => (
              <NewPaletteform
                {...routeProps}
                savePalette={this.savePalette}
                palettes={palettes}
              />
            )}
          />
          <Route
            exact
            path='/'
            render={(routeProps) => (
              <PaletteList
                {...routeProps}
                palettes={palettes}
                deletePalette={this.deletePalette}
                lastPaletteAdded={lastPaletteAdded}
                openSnack={openSnack}
              />
            )}
          />
          <Route
            exact
            path='/palette/:id'
            render={(routeProps) => (
              <Palette
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.id)
                )}
              />
            )}
          />
          <Route
            exact
            path='/palette/:paletteId/:colorId'
            render={(routeProps) => (
              <SingleColorPalette
                colorId={routeProps.match.params.colorId}
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.paletteId)
                )}
              />
            )}
          />
          <Route
            render={(routeProps) => (
              <PaletteList
                {...routeProps}
                palettes={palettes}
                deletePalette={this.deletePalette}
                lastPaletteAdded={lastPaletteAdded}
                openSnack={openSnack}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default App
