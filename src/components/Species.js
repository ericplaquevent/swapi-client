import React from "react";
import { List, ListItem, Typography } from "@material-ui/core";
import gql from "graphql-tag";
import { Query } from "react-apollo/index";

const FETCH_SPECIES_BY_FILM = gql`
  query getSpecies($filmId: ID) {
    film(id: $filmId) {
      speciesConnection {
        species {
          name
          id
        }
      }
    }
  }
`;

const SpeciesList = ({ species }) => {
  return (
    <List>
      {species.map(({ name, id }) => (
        <ListItem key={id}>
          <Typography variant={"body1"}>{name}</Typography>
        </ListItem>
      ))}
    </List>
  );
};

export const Species = ({ filmId }) => {
  return (
    <Query query={FETCH_SPECIES_BY_FILM} variables={{ filmId }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          console.error(error);
          return <div>Error!</div>;
        }

        return <SpeciesList species={data.film.speciesConnection.species} />;
      }}
    </Query>
  );
};
