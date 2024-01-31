import Container from "#/components/ui/container";
import YamapWrapper from "#/components/ui/yamap";
import { getLocations } from '#/lib';

async function page({ params }: { params: any }) {
  const locations = await getLocations();
  
  return (
    <Container>
      <div className="py-16 lg:py-20 px-0 max-w-5xl mx-auto space-y-4">
        <h1 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-5">
          Сервисные центры
        </h1>
        <div className="py-4">
          <YamapWrapper locations={locations} />
        </div>
      </div>
    </Container>
  );
}

export default page;
