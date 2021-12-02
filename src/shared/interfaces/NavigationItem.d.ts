export interface NavigationItem {
    iconPath?: string;
    showAvatarProfile?: boolean;
    title: string;
    path: string;
    chidren?: NavigationItem[];
    eventKey?: string;
    customizeKey?: string;
    notificationKey?: string;
}
