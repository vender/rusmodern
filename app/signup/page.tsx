import Container from "#/components/ui/container";
import SignUpForm from "#/components/auth/sign-up-form";

async function page({ params }: { params: any }) {
  
  return (
    <>
			<Container>
				<div className="py-16 lg:py-20">
					<SignUpForm className="w-500px" addressShow={false} />
				</div>
			</Container>
		</>
  );
}

export default page;
