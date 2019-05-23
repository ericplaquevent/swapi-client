import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Species, Films } from "./";

export const SpeciesDirectory = () => {
  const [selectedFilm, setSelectedFilm] = useState(undefined);

  return (
    <>
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Species directory
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <div style={{ padding: 20 }}>
        <Films onSelect={setSelectedFilm} selectedFilm={selectedFilm} />
        {selectedFilm && (
          <div style={{ marginTop: 20 }}>
            <Typography variant={"h6"}>Species in this movie :</Typography>
            <Species filmId={selectedFilm} />
          </div>
        )}
      </div>
    </>
  );
};
