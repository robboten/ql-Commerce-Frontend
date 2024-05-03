import Image from "next/image";

interface Movie {
  title: string;
  director: string;
  releaseDate: string;
  speciesConnection: {
    species: Species[];
  };
}

interface Species {
  name: string;
  classification: string;
}

export default async function TestComponent() {
  const pa = process.env.GRAPHQL_API_URL;
  console.log(pa);
  if (!pa) return null;
  const { data } = await fetch(pa, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query Query {
            allFilms(first:12) {
              films {
                title
                director
                releaseDate
                speciesConnection {
                  species {
                    name
                    classification
                    homeworld {
                      name
                    }
                  }
                }
              }
            }
          }
    `,
    }),
    next: { revalidate: 1000 },
  }).then((res) => res.json());
  console.log("raw", data);
  const blogPosts: Movie[] = data.allFilms.films;
  console.log(blogPosts);
  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-8 w-full">
      {blogPosts.map((f, i) => {
        return (
          <div
            key={i}
            className="flex flex-col h-full justify-between items-start"
          >
            <Image
              src={`https://picsum.photos/seed/xyz${i}/300`}
              alt="alt"
              width={300}
              height={300}
              className="w-full aspect-square object-cover mb-4"
            />
            <h2 className="text-xl mb-1">{f.title}</h2>
            <span className="text-xl font-bold mb-3">{f.releaseDate}</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              quibusdam quas, veritatis consectetur dignissimos non aspernatur
              fugit. Nostrum soluta rerum alias.
            </p>
          </div>
        );
      })}
    </div>
  );
}
