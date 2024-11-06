import AvatarInfo from "@/components/dashboard/account/profile/AvatarInfo";
import ProfileInfo from "@/components/dashboard/account/profile/ProfileInfo";

export default function Page() {
    return (
        <div>
            <h2 className="text-3xl font-light">My Account</h2>

            <hr className="border-dark-700 my-5" />

            <section className="sm:flex sm:flex-row">
                <div className="mb-3 sm:mr-3">
                    <AvatarInfo />
                </div>

                <ProfileInfo />
            </section>
        </div>
    )
}