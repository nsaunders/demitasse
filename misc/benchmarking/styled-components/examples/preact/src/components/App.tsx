import { signal } from "@preact/signals";
import styled from "styled-components";
import Button from "./Button";
import StarIcon from "./StarIcon";

const Container = styled.div`
  width: 200px;
  height: 200px;
  background: rgb(15, 18, 23);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const loading = signal(false);

export default function App() {
  return (
    <Container>
      <Button
        loading={loading.value}
        icon={StarIcon}
        onClick={() => {
          loading.value = true;
          setTimeout(() => {
            (top || window).location.href =
              "https://github.com/nsaunders/demitasse";
          }, 1000);
        }}>
        Star
      </Button>
    </Container>
  );
}
