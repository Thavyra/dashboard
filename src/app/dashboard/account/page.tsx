import AvatarInfo from "@/components/dashboard/account/profile/AvatarInfo";
import ProfileInfo from "@/components/dashboard/account/profile/ProfileInfo";
import ViewProfileLink from "@/components/dashboard/account/profile/ViewProfileLink";

export default function Page() {
    return (
        <div>
            <h2 className="text-3xl font-light">
                My Account
                <ViewProfileLink className="ml-3" />
            </h2>

            <hr className="border-dark-700 my-5" />

            <section className="lg:flex lg:flex-row">
                <div className="mb-3 mr-3">
                    <AvatarInfo />
                </div>

                <ProfileInfo />
            </section>
        </div>
    )
}