export const SWIPER_OVERLAY_LABELS = {
  left: {
    title: 'NOPE',
    style: {
      label: {
        borderColor: 'red',
        color: 'red',
        borderWidth: 4,
        fontSize: 32,
      },
      wrapper: {
        flexDirection: 'column' as const,
        alignItems: 'flex-end' as const,
        justifyContent: 'flex-start' as const,
        marginTop: 30,
        marginLeft: -30,
      },
    },
  },
  right: {
    title: 'LIKE',
    style: {
      label: {
        borderColor: 'green',
        color: 'green',
        borderWidth: 4,
        fontSize: 32,
      },
      wrapper: {
        flexDirection: 'column' as const,
        alignItems: 'flex-start' as const,
        justifyContent: 'flex-start' as const,
        marginTop: 30,
        marginLeft: 30,
      },
    },
  },
};
