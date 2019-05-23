import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Query } from "react-apollo";
import React from "react";
import gql from "graphql-tag";

const FETCH_ALL_FILMS = gql`
  query getFilms {
    allFilms {
      films {
        title
        id
      }
    }
  }
`;

const FilmList = ({ films, onSelect, selectedFilm }) => {
  return (
    <FormControl style={{ minWidth: 200 }}>
      <InputLabel htmlFor="films-select">Select a movie</InputLabel>

      <Select
        value={selectedFilm}
        onChange={e => onSelect(e.target.value)}
        inputProps={{
          name: "films",
          id: "films-select"
        }}
      >
        {films.map(({ title, id }) => (
          <MenuItem key={id} value={id}>
            {title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const Films = props => {
  return (
    <Query query={FETCH_ALL_FILMS}>
      {({ data, loading, error }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          console.error(error);
          return <div>Error!</div>;
        }

        return <FilmList films={data.allFilms.films} {...props} />;
      }}
    </Query>
  );
};
