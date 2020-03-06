/**
 * {'tutorial':{IconComponent:xxx,IconName:xxx,Label:'xxx',}}
 */
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export const Menu = {
  'tutorial': { IconComponent: Ionicons, IconName: 'ios-bookmarks', Label: '教程', },
  'customLanguage': { IconComponent: Ionicons, IconName: 'md-checkbox-outline', Label: '自定义语言', },
  'sortLanguage': { IconComponent: MaterialCommunityIcons, IconName: 'sort', Label: '语言排序', },
  'customLabel': { IconComponent: Ionicons, IconName: 'md-checkbox-outline', Label: '自定义标签', },
  'sortLabel': { IconComponent: MaterialCommunityIcons, IconName: 'sort', Label: '标签排序', },
  'removeLabel': { IconComponent: Ionicons, IconName: 'md-remove', Label: '标签移除', },
  'customTheme': { IconComponent: Ionicons, IconName: 'ios-color-palette', Label: '自定义主题', },
  'aboutAuthor': { IconComponent: Octicons, IconName: 'smiley', Label: '关于作者', },
  'feedback': { IconComponent: MaterialIcons, IconName: 'feedback', Label: '反馈', },
  'CodePush': { IconComponent: Ionicons, IconName: 'ios-planet', Label: 'CodePush', },
}